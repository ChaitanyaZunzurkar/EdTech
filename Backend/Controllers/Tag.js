const Tag = require('../Models/Tags')

exports.createTag = async (req ,res) => {
    try {
        const { name , description } = req.body

        if(!name || !description) {
            return res.status(400).json({
                sucess:false,
                message:"Please fill all the required fields"
            })
        }

        const tag = await Tag.create({
            name,
            description
        })

        console.log(tag)
        res.status(201).json({
            success:true,
            message:"Tag created successfully"
        })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Fail to create a tag"
        })
    }
}

exports.showAllTag = async (req , res) => {
    try {
        const allTag = await Tag.find({} , { name: true , description: true})
        console.log(allTag)

        res.status(200).json({
            success:true,
            message:"Fetched all tags successfully",
            allTag
        })

    } catch(error) {
        console.log("Error occured in fetching tag" , allTag);
        return res.status(500).json({
            success:false,
            message:"Fail to fetch tags from DB"
        })
    }
}