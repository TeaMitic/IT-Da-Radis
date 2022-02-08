export default { 
    validatePassword(password,repeatedPassword) { 
        if (password == null || password == "") {
            return 'Polje "New password" nije popunjeno.'
        }
        if (repeatedPassword == null || repeatedPassword == "") {
            return 'Polje "Repeat password" nije popunjeno.'
        }
        if (password !== repeatedPassword) { 
            return 'Sifre se ne poklapaju.'
        }
        return 'OK'
    }
}