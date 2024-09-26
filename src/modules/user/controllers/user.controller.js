import UserService from "../services/user.service.js";
const UserController = {
    addUser: async (req, res) => {
        const {u_name, u_birth_date} = req.body
        console.log(u_name, u_birth_date)
        const created = await UserService.createUser({u_name, u_birth_date})

        res.status(201).json({
            success: true,
            data: created,
            URL: req.url
        })
    },
    showAllUser: async (req,res)=>{
        try {
            const users = await UserService.getUserAll()
            res.status(200).json({ 
                success: true,
                data: users,
                URL: req.url
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: error.message
            });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const users = await UserService.getUserById(id);
            
            if (!users || users.length === 0) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    getByName: async (req, res) => {
        const { u_name } = req.params;
        const users = await UserService.getUserByName(u_name)
        res.status(200).json({
            success:true,
            data: users
        })
    }
    ,updateUser : async (req,res)=>{
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ success: false, message: 'ID is required' });
            }
            const {u_name,u_birth_date} = req.body
            const updated = await UserService.updateOneUserById (id,{u_name,u_birth_date})
            res.status(200).json({
                success:true,
                data: updated
            })
        } catch (err) {
            throw new Error(`Error updating user: ${err.message}`);
        }
    }  ,deleteUser : async (req,res)=>{
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ success: false, message: 'ID is required' });
            } 
            
            const result = await UserService.deleteUserById(id)
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Data not found' });
            }
            res.status(200).json({
                success:true,
                message: 'Data deleted successfully',
                data: result
            })
        } catch (err) {
            console.error(`Error deleting data: ${err.message}`);
            res.status(500).json({ success: false, message: `Error deleting data: ${err.message}` });
        }
    }
}

export default UserController