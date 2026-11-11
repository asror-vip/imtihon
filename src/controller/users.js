import osFile from "../utils/file.system.js"

const register = (req, res) => {
    const { username, phone } = req.body
    const users = osFile.read("users")

    let existUser = users.find(user => user.username === username)
    if (existUser) {
        return res.status(409).json({
            message: "Bu ismli foydalanuvchi allaqachon mavjud"
        })
    }

    const newUser = {
        id: users.length ? users.at(-1).id + 1 : 1,
        username: username,
        phone: +phone
    }

    users.push(newUser)
    osFile.write("users", users)

    res.status(201).json({
        data: newUser
    })
}

const usersGet = (req, res) => {
    res.json({
        data: osFile.read("users")
    })
}

const foodsGet = (req, res) => {
    const foods = osFile.read("foods")
    const { userId } = req.query
    const result = userId
        ? foods.filter(food => String(food.userId) === String(userId))
        : foods

    res.json({
        data: result
    })
}

const orderCreate = (req, res) => {
    const orders = osFile.read("orders")

    const order = {
        id: orders.length ? orders.at(-1).id + 1 : 1,
        userId: req.body.userId,
        foodId: req.body.foodId,
        count: req.body.count
    }

    orders.push(order)
    osFile.write("orders", orders)

    res.status(201).json({
        data: order
    })
}

export default {
    register,
    usersGet,
    foodsGet,
    orderCreate
}
