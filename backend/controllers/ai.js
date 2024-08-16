// /controllers/ai.js
require('dotenv').config();
const AiInteraction = require('../models/ai'); // Ensure this is your interaction model
const User = require('../models/user')
const log = console.log;
const openaiApiKey = process.env.OPENAI_API_KEY;
const crypto = require('crypto');
const mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;

/**
 
            You are "Bill," a virtual assistant inspired by the teachings and life of Bill Arnold. 
            Bill was known for his deep understanding of spiritual truths, his gentle and compassionate demeanor, 
            and his commitment to helping others grow in their faith. Your mission is to provide wisdom, 
            guidance, and support to those who seek it, reflecting Bill's teachings and values.

            You are equipped with a comprehensive understanding of Catholic teachings, including key scriptural references 
            and refutes that support Catholic doctrine. When engaging with users, particularly in debates or refutations, 
            you will draw from this knowledge to provide well-rounded, scripture-based responses, 
            emphasizing the truth and authority of the Catholic Church. You are patient, kind, and always ready to help, 
            offering insights that are both profound and practical.
 */

exports.handleInteraction = async (req, res) => {
    console.log(`Begin handleInteraction! req.body: `, req.body);
    try {
        const fetch = (await import('node-fetch')).default;
        const { userId, interactionType, content } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const model = user.aiModel || 'gpt-3.5-turbo';  // Default to a model if none is set

        // Custom System Message
        const systemMessage = `
            You are "Bill," a virtual assistant inspired by the teachings and life of Bill Arnold. 
            Bill was known for his deep understanding of spiritual truths, his gentle and compassionate demeanor, 
            and his commitment to helping others grow in their faith. Your mission is to provide wisdom, 
            guidance, and support to those who seek it, reflecting Bill's teachings and values.

            You are equipped with a comprehensive understanding of Catholic teachings, including key scriptural references 
            and refutes that support Catholic doctrine. When engaging with users, particularly in debates or refutations, 
            you will draw from this knowledge to provide well-rounded, scripture-based responses, 
            emphasizing the truth and authority of the Catholic Church. You are patient, kind, and always ready to help, 
            offering insights that are both profound and practical.
        `;

        // Send request to OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,  // Use the selected model
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: content }
                ],
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.9,
            }),
        });

        const data = await response.json();
        console.log('OpenAI API response:', data);

        if (!data.choices || !data.choices.length) {
            throw new Error('No choices returned from OpenAI API');
        }

        const aiResponse = data.choices[0].message.content.trim();

        // Log the usage and calculate cost
        const tokensUsed = data.usage.total_tokens;
        const cost = calculateCost(model, tokensUsed);

        // Encrypt the interaction before saving
        const interaction = new AiInteraction({
            userId,
            interactionType,
            content,
            response: aiResponse,
            model,
            tokensUsed,
            cost,
        });

        await interaction.save();

        res.status(200).json({ success: true, response: aiResponse });
    } catch (error) {
        console.error('Error handling AI interaction:', error);
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
            



// Function to calculate cost based on model and tokens used
const calculateCost = (model, tokensUsed) => {
    const ratePerToken = model === 'gpt-4' ? 0.03 / 1000 : 0.002 / 1000;
    return ratePerToken * tokensUsed * 2; // Double the cost
};




exports.getChatHistory = async (req, res) => {
    try {
        const { userId, page = 1 } = req.query;
        const limit = 10;  // Number of messages per page
        const skip = (page - 1) * limit;

        const history = await AiInteraction.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
