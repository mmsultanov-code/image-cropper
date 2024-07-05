const userService = require('../services/UserService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
  	async getAllUsers(req, res) {
		try {
			const users = await userService.getAllUsers()
			res.json(users.map((item) => {
				return {
					id: item.id,
					name: item.name,
					email: item.email,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt
				}
			}))
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
  	}
	async createUser(req, res) {
		const userData = req.body
		try {
			const hashedPassword = await bcrypt.hash(userData.password, 10)
			const newUser = await userService.createUser({
				name: userData.name,
				email: userData.email,
				password: hashedPassword,
			})
			const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_TOKEN || 'WdimMiw9219', { expiresIn: process.env.expiresIn || "1h" })
			res.status(201).json({ user: newUser, token })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
  	async getUserById(req, res) {
		const id = req.params.id
		try {
			const user = await userService.getUserById(id)
			res.json({
				name: user.name,
				email: user.email
			})
		} catch(err) {
			res.status(404).json({error: err.message})
		}
	}
    async login(req, res) {
		console.log(req.body)
        const { email, password } = req.body
        try {
            const user = await userService.getUserByEmail(email)
            if (!user) {
                return res.status(401).json({ error: 'Неверные учетные данные' })
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Неверные учетные данные' })
            }
            const access_token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_TOKEN || 'WdimMiw9219', { expiresIn: process.env.expiresIn || "1h" })
            res.json({ access_token })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async deleteUser(req, res) {
        const id = req.params.id
        try {
            await userService.deleteUser(id)
            res.json({
				message: "Пользователь успешно удален."
			}).status(204)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
	async update(req, res) {
		const id = req.params.id
		const postData = req.body
	
		try {
			const updatedUser = await userService.update(id, postData);
			if (updatedUser === 0) {
				return res.status(404).json({ error: "Пользователь не найден" });
			}
			res.json(updatedUser);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new UserController()
