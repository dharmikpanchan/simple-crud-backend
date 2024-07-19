// src/routes/userRoutes.js
import router from 'express';
import { addUser, getAllUsers, deleteUser, editUser, loginUser, editUserDetails } from '../controllers/UserController.js';
import { auth, restric } from '../middleware/auth.js';


const userRouter = router();
userRouter.post('/login', loginUser);
userRouter.post('/add', addUser);
// userRouter.get('/getall', auth, restric("Employee"), getAllUsers);
userRouter.get('/getall', auth, getAllUsers);
userRouter.get('/edit-user-details', editUserDetails);
userRouter.delete('/delete/:id',auth, deleteUser);
userRouter.put('/edit/:id', editUser);

export { userRouter };
