const Category = require('../Models/Categories')

exports.createCategory = async (req ,res) => {
    try {
        const { name , description } = req.body

        if(!name || !description) {
            return res.status(400).json({
                sucess:false,
                message:"Please fill all the required fields"
            })
        }

        const Category = await Category.create({
            name,
            description
        })

        console.log(Category)
        res.status(201).json({
            success:true,
            message:"Category created successfully"
        })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Fail to create a Category"
        })
    }
}

exports.showAllCategory = async (req , res) => {
    try {
        const allCategory = await Category.find({} , { name: true , description: true})
        console.log(allCategory)

        res.status(200).json({
            success:true,
            message:"Fetched all Categories successfully",
            allTag
        })

    } catch(error) {
        console.log("Error occured in fetching Categories" , allCategory);
        return res.status(500).json({
            success:false,
            message:"Fail to fetch Categories from DB"
        })
    }
}