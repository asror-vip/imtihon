import osFile from "../utils/file.system.js"

const register = (req, res) => {
    const users = osFile.read("users")

    const user = {
        id: users.length
            ? Number(users[users.length - 1].id ?? users[users.length - 1].userId) + 1
            : 1,
        username: req.body.username,
        telephone: req.body.telephone
    }

    users.push(user)
    osFile.write("users", users)

    res.status(201).json({ data: user })
}

const usersGet = (req, res) => {
    res.json({ data: osFile.read("users") })
}

const foodsGet = (req, res) => {
    const foods = osFile.read("foods")
    const { userId } = req.query
    const result = userId
        ? foods.filter(food => String(food.userId) === String(userId))
        : foods

    res.json({ data: result })
}

const orderCreate = (req, res) => {
    const orders = osFile.read("orders")

    const order = {
        id: orders.length ? orders[orders.length - 1].id + 1 : 1,
        userId: req.body.userId,
        foodId: req.body.foodId,
        count: req.body.count
    }

    orders.push(order)
    osFile.write("orders", orders)

    res.status(201).json({ data: order })
}

export default {
    register,
    usersGet,
    foodsGet,
    orderCreate
}