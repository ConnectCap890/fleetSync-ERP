const Journey = require('../Models/Journey');

exports.createJourney = async (req, res) => { 
    const { from, to,estimatedDistance, estimatedDuration, description } = req.body;
    try {
        
        const newJourney = new Journey({ from, to, estimatedDistance, estimatedDuration, description });
        await newJourney.save();
        res.status(201).json(newJourney);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getJourneys = async (req, res) => {
    try {
        const journeys = await Journey.find();
        res.status(200).json(journeys);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getJourneyById = async (req, res) => {
    const { id } = req.params;
    try {
        const journey = await Journey.findById(id);     
        if (!journey) {
            return res.status(404).json({ message: 'Journey not found' });
        }
        res.status(200).json(journey);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateJourney = async (req, res) => {
    const { id } = req.params;
    const { from, to, estimatedDistance, estimatedDuration, description } = req.body;
    try {
          const updates = {};
        const allowedFields = ['from', 'to', 'estimatedDistance', 'estimatedDuration', 'description'];
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }); 
        const updatedJourney = await Journey.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedJourney) {
            return res.status(404).json({ message: 'Journey not found' });
        }
        res.status(200).json(updatedJourney);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteJourney = async (req, res) => {
    const { id } = req.params;  
    try {
        const deletedJourney = await Journey.findByIdAndDelete(id);    
        if (!deletedJourney) {
            return res.status(404).json({ message: 'Journey not found' });
        }
        res.status(200).json({ message: 'Journey deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
