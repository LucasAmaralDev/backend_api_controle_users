
const { UserModel } = require('../model/User-Model');

class UserController {
    async create(req, res) {
        try {

            //recebendo dados da api
            const { username, password, dateExpiration } = req.body;

            //verificando se todos os dados foram recebidos
            if (!username || !password || !dateExpiration) {
                return res.status(400).json({
                    error: 'Dados Invalidos'
                })
            }

            //verificando se o username possui espaço
            if (username.indexOf(' ') >= 0) {
                return res.status(400).json({
                    error: 'Nome de usuario não pode conter espaço'
                })
            }

            //verificando de ja existe usuario com esse nome
            const existUser = await UserModel.findOne({ where: { username } });

            //se ja existe usuario com esse nome retorna o erro informando isso
            if (existUser) {
                return res.status(400).json({
                    error: 'Usuario ja existe'
                })
            }

            //verificando se a senha possui mais de 8 caracteres
            if (password.length < 8) {
                return res.status(400).json({
                    error: 'Senha muito curta, Insira uma senha com no minimo 8 caracteres'
                })
            }

            console.log(dateExpiration)
            //verificando se a data de expiração timestamp é maior que a data atual
            if (dateExpiration < (Date.now())) {
                return res.status(400).json({
                    error: 'Data de expiração invalida'
                })
            }

            //criando usuario
            const user = await UserModel.create({ username, password, dateExpiration });

            if (user) {
                return res.status(200).json({
                    message: 'Usuario criado com sucesso'
                })
            }

            else {

                return res.status(400).json({
                    error: 'Erro ao criar usuario'
                })

            }


        } catch (error) {

            return res.status(400).json({
                error: 'erro inexperado'
            })
        }

    }

    async login(req, res) {

        try {

            //recebendo login e password do solicitante
            const { username, password, idHD } = req.body;

            //verificando se todos os dados foram recebidos
            if (!username || !password || !idHD) {
                return res.status(400).json({
                    error: 'Dados Ausentes'
                })
            }

            //verificando se login e senha correspondem a algum usuario
            const user = await UserModel.findOne({ where: { username, password } });

            //se não corresponder retorna erro
            if (!user) {
                return res.status(400).json({
                    error: 'Usuario ou senha invalidos'
                })
            }

            //se ipHD estiver vazio, preenche com o ip do solicitante
            if (!user.ipHD) {
                user.ipHD = idHD;
                await user.save();

                return res.status(200).json({
                    login: 'ok',
                    dateExpiration: user.dateExpiration
                })
            }

            //senão verifica se o ip do solicitante é o mesmo do usuario
            if (user.ipHD !== idHD) {
                return res.status(400).json({
                    error: 'Identiicador do usuario não corresponde ao solicitante'
                })
            }

            //se corresponder retorna o ok
            else {

                return res.status(200).json({
                    login: 'ok',
                    dateExpiration: user.dateExpiration
                })

            }


        } catch (error) {

            return res.status(400).json({
                error: 'erro inexperado'
            })

        }
    }

    async update(req, res) {

        try {

            //recebendo dados da api
            const { username, password, dateExpiration } = req.body;

            // verificando se o usuario foi recebido
            if (!username) {
                return res.status(400).json({
                    error: 'Usuario não informado'
                })
            }

            //verificando se recebeu algum dado para alterar
            if (!password && !dateExpiration) {
                return res.status(400).json({
                    error: 'Dados para alteração não informados'
                })
            }

            //verificando se o usuario existe
            const user = await UserModel.findOne({ where: { username } });

            //se o usuario não existir retorna erro
            if (!user) {
                return res.status(400).json({
                    error: 'Usuario não existe'
                })
            }

            //alterando dados do usuario
            const userUpdate = await UserModel.update({ password, dateExpiration }, { where: { username } });

            //verificando se o usuario foi alterado
            if (userUpdate) {
                return res.status(200).json({
                    message: 'Usuario alterado com sucesso'
                })
            }

            //se não foi alterado retorna erro
            else {
                return res.status(400).json({
                    error: 'Erro ao alterar usuario'
                })
            }



        } catch (error) {

            return res.status(400).json({
                error: 'erro inexperado'
            })

        }



    }

    async delete(req, res) {

        try {

            //recebendo dados da api
            const { username } = req.body;

            //verificando se o usuario foi recebido
            if (!username) {
                return res.status(400).json({
                    error: 'Usuario não informado'
                })
            }

            //verificando se o usuario existe
            const user = await UserModel.findOne({ where: { username } });

            //se o usuario não existir retorna erro
            if (!user) {
                return res.status(400).json({
                    error: 'Usuario não existe'
                })
            }

            //deletando usuario
            const userDelete = await UserModel.destroy({ where: { username } });

            //verificando se o usuario foi deletado
            if (userDelete) {
                return res.status(200).json({
                    message: 'Usuario deletado com sucesso'
                })
            }

            //se não foi deletado retorna erro
            else {
                return res.status(400).json({
                    error: 'Erro ao deletar usuario'
                })
            }

        } catch (error) {

            return res.status(400).json({
                error: 'erro inexperado'
            })

        }


    }

    async list(req, res) {

        try {

            //listando todos os usuarios
            const users = await UserModel.findAll();

            //verificando se existem usuarios
            if (users) {
                return res.status(200).json({
                    users
                })
            }

            //se não existem usuarios retorna erro
            else {
                return res.status(400).json({
                    error: 'Erro ao listar usuarios'
                })
            }



        } catch (error) {

            return res.status(400).json({
                error: 'erro inexperado'
            })

        }



    }

    async listOne(req, res) {

        //recebendo dados da api
        const username = req.params.username;

        //verificando se o usuario foi recebido
        if (!username) {
            return res.status(400).json({
                error: 'Usuario não informado'
            })
        }

        //verificando se o usuario existe
        const user = await UserModel.findOne({ where: { username } });

        //se o usuario não existir retorna erro
        if (!user) {
            return res.status(400).json({
                error: 'Usuario não existe'
            })
        }

        //se o usuario existir retorna o usuario
        else {
            return res.status(200).json({
                user
            })
        }

    }

    async limparIpHD(req, res) {

        try {

            //recebendo dados da api
            const { username } = req.body;

            //verificando se o usuario foi recebido
            if (!username) {
                return res.status(400).json({
                    error: 'Usuario não informado'
                })
            }

            //verificando se o usuario existe
            const user = await UserModel.findOne({ where: { username } });

            //se o usuario não existir retorna erro
            if (!user) {
                return res.status(400).json({
                    error: 'Usuario não existe'
                })
            }

            //se o usuario existir limpa o ipHD
            else {
                user.ipHD = null;
                await user.save();

                return res.status(200).json({
                    message: 'IpHD limpo com sucesso'
                })
            }

        } catch (error) {

        }





    }
}

module.exports = new UserController();