import User from '../models/user.js'

export const getUsers = async  (req, res) => {
    try {
        const users = await User.find()

        console.log(users)

        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createUsers = async (req, res) => {

    console.log(req.body)
    const user = req.body

    console.log(user)

    const newUser = new User(user)
    try {
        await newUser.save()

        res.status(201).json(newUser)
        
    } catch (error) {
        res.status(409).json({message: error.message})
        
    }

}