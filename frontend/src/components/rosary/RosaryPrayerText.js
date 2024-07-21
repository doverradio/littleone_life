import React from 'react';
import rosaryImage from './rosary_howto.jpg';

const RosaryPrayerText = ({ fontSize }) => {
    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-12">
                    <h2 style={{ fontSize: '25px' }} className="text-center m-1">How to Pray the Rosary</h2>
                    <p style={{ fontSize: `${fontSize}px` }}>
                        Engaging in the Rosary involves a series of prayers that offer deep reflection on the 
                        life events of Jesus and Mary. Here’s a simple guide to follow:
                    </p>
                    <div className='mb-3'>
                        <img src={rosaryImage} alt="rosary image" />
                    </div>
                    <div style={{ textAlign: 'left', fontSize: `${fontSize}px` }}>
                        <p>
                            1a. <strong>Begin with the Sign of the Cross:</strong><br />
                            <span style={{ color: 'blue' }}>    
                                In the name of the Father, and of the Son, and of the Holy Spirit. Amen.
                            </span>
                        </p>
                        <p>
                            1b. <strong>Holding the Crucifix:</strong> Start by reciting the Apostles' Creed, an affirmation of faith: <br />
                            <span style={{ color: 'blue' }}>    
                                I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ, 
                                His only Son, Our Lord, Who was conceived by the Holy Ghost, born of the Virgin Mary, suffered under Pontius Pilate, 
                                was crucified; died, and was buried. He descended into Hell; the third day He arose again from the dead; He ascended 
                                into Heaven, sitteth at the right hand of God, the Father Almighty; from thence He shall come to judge the living and 
                                the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, 
                                the resurrection of the body, and the life everlasting. Amen.
                            </span>
                        </p>
                        <p>
                            2. <strong>Our Father:</strong> Recite the 'Our Father' prayer:<br />
                            <span style={{ color: 'blue' }}>    
                                Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. 
                                Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead 
                                us not into temptation, but deliver us from evil, Amen.
                            </span>
                        </p>
                        <p>
                            3. <strong>Say 3 Hail Marys:</strong> For each bead of the next three beads, say the 'Hail Mary' prayer: <br />
                            <span style={{ color: 'blue' }}>    
                                Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. 
                                Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.
                            </span>
                        </p>
                        <p>
                            4. <strong>Glory be to the Father and Fatima Prayer:</strong> Conclude this introductory portion with the 'Glory Be' prayer and 'Fatima' prayer. <br />
                            <strong>Glory be:</strong>&nbsp;
                            <span style={{ color: 'blue' }}>    
                                Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.
                            </span>
                            <br />
                            <br />
                            <strong>Fatima Prayer:</strong>&nbsp;
                            <span style={{ color: 'blue' }}>    
                                O my Jesus, forgive us our sins, save us from the fires of hell; lead all souls to heaven especially those who are in most need of Your mercy. Amen.
                            </span>
                        </p>
                        <p>
                            5. <strong>Announce the First Mystery:</strong> Then say the Fatima prayer Our Father : <br />
                            <span style={{ color: 'blue' }}>    
                                Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.
                            </span>
                        </p>
                        <p>
                            6. <strong>On the Ten Small Beads of Each Decade:</strong> For each bead in the decade, contemplate the announced Mystery and recite the 'Hail Mary.'  <br />
                            <span style={{ color: 'blue' }}>    
                                {/* Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen. */}
                            </span>
                        </p>
                        <p>
                            7. <strong>Glory be to the Father and Fatima Prayer:</strong> After each decade say the Glory Be and Fatima prayer, requested by the Blessed Virgin Mary at Fatima.  <br />
                            <span style={{ color: 'blue' }}>    
                                {/* Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen. */}
                            </span>
                        </p>
                        <p>
                            8. <strong>Announce the Second Mystery:</strong> Then say the Our Father. Repeat 6 and 7 and continue with the Third, Fourth, and Fifth Mysteries in the same manner. <br />
                            <span style={{ color: 'blue' }}>    
                                {/* Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen. */}
                            </span>
                        </p>
                        <p>
                            9. <strong>Hail, Holy Queen:</strong> After saying the five decades, say the Hail, Holy Queen, followed by this dialogue and prayer: <br />
                            <span style={{ color: 'blue' }}>    
                                Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope, to thee do we cry, poor banished children of Eve; to thee do we send up our 
                                sighs, mourning and weeping in this vale of tears; turn, then, most gracious Advocate, thine eyes of mercy toward us, and after this, our exile, show 
                                unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy 
                                of the promises of Christ.
                            </span>
                        </p>
                        <p>
                            <strong>Optional prayers:</strong> <br />
                            After saying the the Hail, Holy Queen, you may optionally say these prayers before stating your prayer intentions: <br />
                            <span style={{ color: 'blue' }}>    
                                O God, whose Only Begotten Son, by his life, Death, and Resurrection, has purchased for us the rewards of eternal life, grant, we beseech thee, that while 
                                meditating on these mysteries of the most holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the 
                                same Christ our Lord. Amen.
                            </span>
                            <br />
                            <br />
                            <strong>Prayer to the Holy Spirit:</strong><br />
                            <span style={{ color: 'blue' }}>    
                            Come, Holy Spirit, fill the hearts of your faithful
                            and kindle in them the fire of your love.

                            Send forth your Spirit and they shall be created,
                            and you shall renew the face of the earth.

                            Let us pray.

                            O God, who have taught the hearts of the faithful
                            by the light of the Holy Spirit,
                            grant that in the same Spirit we may be truly wise
                            and ever rejoice in his consolation.
                            Through Christ our Lord. Amen.
                            </span>
                        </p>
                        <h3 className='text-center mb-5' style={{ fontSize: '25px' }}>Conclude the Rosary with the Sign of the Cross.</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RosaryPrayerText;
