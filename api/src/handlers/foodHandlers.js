const { getFoodByNameController } = require('../controllers/foodControllers/getFoodByNameController');
const { getAllFoodController } = require('../controllers/foodControllers/getAllFoodsController');
const { postFoodController } = require('../controllers/foodControllers/postFoodController');
const { deleteFoodController } = require('../controllers/foodControllers/deleteFoodController');
const { putFoodController } = require('../controllers/foodControllers/putFoodController');


const getFoodHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const foodByName = await getFoodByNameController(name);
            res.status(200).send(foodByName);
        } else {
            const allFood = await getAllFoodController();
            res.status(200).send(allFood);
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const postFoodHandler = async (req, res) => {
    const { description, name, initial_price, discount, diets, category } = req.body;
    const image = req.file.buffer;
    const final_price = initial_price * (1 - (discount / 100));
    // console.log(image);
    // convierto en array 'diets' que llega como string
    const diet=diets.split(',');
    const total_score=0;
    console.log(diet);
    try {
        if (description && name && image && initial_price && discount && final_price && category && diet) {
            const newFood = await postFoodController(name, image, description, category, initial_price, discount, final_price, total_score, diet);
            res.status(200).send(newFood);
        } else {
            throw new Error('Falta información en el cuerpo de la solicitud o la imagen no es válida');
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


const putFoodHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, diet, description, initial_price, discount, status, category } = req.body;
        const final_price = initial_price * (1 - (discount / 100));
        const image = req.file ? req.file.buffer : null;
        console.log(image);
        console.log(req.body);
        await putFoodController(id, name, diet, description, image, initial_price, discount, final_price, status, category);
        res.status(200).send('Modificacion exitosa');
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const deleteFoodHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteFoodController(id);
        res.status(200).send("Se eliminó con éxito");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};



module.exports = { getFoodHandler, postFoodHandler, putFoodHandler, deleteFoodHandler };