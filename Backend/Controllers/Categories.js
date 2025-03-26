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

        const category = await Category.create({
            name,
            description
        })

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

        res.status(200).json({
            success:true,
            message:"Fetched all Categories successfully",
            allCategory
        })

    } catch(error) {
        console.log("Error occured in fetching Categories" , error.message);
        return res.status(500).json({
            success:false,
            message:"Fail to fetch Categories from DB"
        })
    }
}

exports.CategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body
        if(!categoryId) {
            return res.status(500).json({
                success:false,
                message:"Category Id does not found"
            })
        }

        const CategoryCourses = await Category.findById(categoryId).populate("courses").exec()

        if(!CategoryCourses) {
            return res.status(500).json({
                success:false,
                message:"Courses not found"
            })
        }

        const differntCategory = await Category.find({ _id: { $ne : categoryId } }).populate("courses").exec()

        if(!differntCategory) {
            return res.status(500).json({
                success:false,
                message:"Category not found"
            })
        }

        const topSellingCourses = await Category.find({  }).populate({
            path:"courses",
            options: { sort : { studentEnrolled : -1 }}
        }).limit(10)

        res.status(200).json({
            success:true,
            message:"Courses fetch accourding to category.",
            data : {
                CategoryCourses,
                differntCategory,
                topSellingCourses
            }
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Fail to fetch Categories from DB"
        })
    }
}