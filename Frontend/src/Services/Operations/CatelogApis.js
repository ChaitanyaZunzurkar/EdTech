import { apiConnector } from "../apiConnector"
import { catelog } from "../apis"

export const getCategoryPageDetails = async (categoryId) => {
    let result = []
    try {
        console.log("working")
        const response = await apiConnector('POST' , catelog.CATELOG_PAGE_DETAILS , {
            categoryId: categoryId
        })

        if(!response?.data?.success) {
            throw new Error("Fail to fetch the category page details")
        }

        result = response?.data?.data
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return result
}
