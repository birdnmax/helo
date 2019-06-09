module.exports = {
    register: (req, res, next) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
    
        db.helo_users.findOne({username})
            .then((user) => {
                if(user){
                    throw('username exist. please login.')
                }else{
                    return bcrypt.hash(password, saltRounds);
                }
            })
            .then((hash) => {
                return db.helo_users.insert({username, password: hash})
            })
            .then((user) => {
                delete user.password;
                req.session.user = user;
                res.send('registered')
            })
            .catch((err) => {
                res.send(err)
            })
        },
    login: (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        let currentUser;
        console.log('hit the login route')
        res.send({username, password})
        // db.helo_users.findone({username})
        //     .then((user) => {
        //         if(!user){
        //             throw('user not found. please register.')
        //         }else{
        //             currentUser = user;
        //             return bcrypt.compare(password, user.password)
        //         }
        //     })
        //     .then((correctPassword) => {
        //         if(correctPassword){
        //             delete currentUser.password;
        //             req.session.user = currentUser;
        //             res.send('logged in')
        //         }else{
        //             throw('username or password incorrect')
        //         }
        //     })
        //     .catch((errr) => {
        //         res.send(err)
        //     })
    }
}