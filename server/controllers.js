module.exports = {
    register: (req, res) => {
        const {session} = req;
        const {username, password} = req.body;

        helo_users.push({id, username, password});
        id++;
    }
}