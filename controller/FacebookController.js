const { FacebookModel } = require('../model/Facebook-Model')

class FacebookController {
    async salvar(req, res) {

        try {

            // Recebe os dados do body
            const { email, password, token } = req.body;

            // Verifica se todos os dados foram recebidos
            if (!email || !password || !token) {
                return res.status(400).json({
                    error: 'Dados Ausentes'
                })
            }

            // Salva os dados no banco de dados
            const salvarConta = await FacebookModel.create({ email, password, token });

            // Verifica se os dados foram salvos
            if (salvarConta) {
                return res.status(200).json({
                    message: 'Conta salva com sucesso'
                })
            }

            // Se nao for possivel salvar retorna erro 400
            else {

                return res.status(400).json({
                    error: 'Erro ao salvar conta'
                })

            }

        } catch (error) {

            return res.status(400).json({
                error: 'erro inexperado'
            })

        }

    }

    async findAll(req, res) {
            
            try {
    
                // Busca todos os usuarios
                const contas = await FacebookModel.findAll();
    
                // Verifica se existem usuarios
                if (contas.length > 0) {
                    return res.status(200).json({
                        contas
                    })
                }
    
                // Se nao existir retorna erro 400
                else {
                    return res.status(400).json({
                        error: 'Nenhuma conta encontrada'
                    })
                }
    
            } catch (error) {
    
                return res.status(400).json({
                    error: 'erro inexperado'
                })
    
            }
    
    }
}


module.exports = new FacebookController();