const MassAttendance = require('../models/massAttendance'); // Adjust the path as necessary
const log = console.log;

exports.createMassAttendance = async (req, res) => {
    const { user, church, massTime, i, specialIntentions } = req.body;

    console.log('Received mass attendance data:', { user, church, massTime, i, specialIntentions }); // Log data

    const newMassAttendance = new MassAttendance({
        user,
        church,
        massTime,
        i,
        specialIntentions
    });

    try {
        const savedMassAttendance = await newMassAttendance.save();
        res.status(201).json(savedMassAttendance);
    } catch (error) {
        console.error('Error creating mass attendance:', error);
        res.status(400).json({ error: 'Unable to create mass attendance' });
    }
};


exports.countMassesByUser = async (req, res) => {
    const { userId } = req.body; // Assuming the user ID is passed as a URL parameter

    try {
        const count = await MassAttendance.countDocuments({ user: userId });
        res.json({ userId: userId, massAttendanceCount: count });
    } catch (error) {
        res.status(400).json({ error: "Error fetching mass attendance count" });
    }
};

exports.getMassAttendanceByUser = async (req, res) => {
    const { userId, massId } = req.body;
    try {
        const massAttendance = await MassAttendance.findOne({ _id: massId, user: userId }).populate('user').populate('church');
        if (!massAttendance) {
            return res.status(404).json({ error: "Mass attendance not found" });
        }
        res.json(massAttendance);
    } catch (error) {
        res.status(400).json({ error: "Error fetching mass attendance" });
    }
};


exports.getAllMassAttendances = async (req, res) => {
    const { userId } = req.body;
    try {
        const massAttendances = await MassAttendance.find({user: userId}) //.populate('user').populate('church');
        let formattedMasses = massAttendances.filter( mass => {
            let { church, massTime, i } = mass;
            return { church, massTime, intentions: i, user: userId }
        })
        res.json(formattedMasses);
    } catch (error) {
        res.status(400).json({ error: "Unable to retrieve mass attendances" });
    }
};

exports.getUserMasses = async (req, res) => {
    try {
        const { userId, page, limit } = req.body;

        // Fetch masses with pagination
        const userMasses = await MassAttendance.find({ user: userId })
            .populate('i')
            .populate('church')
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        // Transform the userMasses
        const formattedMasses = userMasses.map(mass => {
            let newChurch = mass.church && mass.church.name ? mass.church.name : 'Unknown Church';
            return {
                ...mass.toObject(), // Convert Mongoose document to a plain JavaScript object
                church: newChurch
            };
        });

        // Get total count for pagination
        const total = await MassAttendance.countDocuments({ user: userId });

        res.json({ masses: formattedMasses, total });
    } catch (error) {
        console.error('Error fetching user masses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.updateMassAttendance = async (req, res) => {
    const { massId } = req.body;
    try {
        const massAttendance = await MassAttendance.findByIdAndUpdate(massId, req.body, { new: true });
        res.json(massAttendance);
    } catch (error) {
        res.status(400).json({ error: "Unable to update mass attendance" });
    }
};

exports.deleteMassAttendance = async (req, res) => {
    const { massId } = req.body;
    try {
        await MassAttendance.findByIdAndDelete(massId);
        res.json({ message: "Mass attendance deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Unable to delete mass attendance" });
    }
};

exports.deleteMassAttendances = async (req, res) => {
    try {
        // Extract the IDs of the mass attendances to delete from the request body
        const { rowsToDelete } = req.body;

        // Delete the MassAttendance documents with the provided IDs
        await MassAttendance.deleteMany({ _id: { $in: rowsToDelete } });

        res.status(200).json({
            message: 'Mass attendances deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting mass attendances',
            error: error.message
        });
    }
};
