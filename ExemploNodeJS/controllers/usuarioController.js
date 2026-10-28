const usuarioModel = require('../models/usuario');
var listaUsuarios = [];

exports.listarUsuarios = async (req, res) => {
    const ativo = req.query.ativo;
    var usuarios = [];
    if (ativo)
        usuarios = await usuarioModel.find({ ativo: ativo });
    else
        usuarios = await usuarioModel.find();
    res.json(usuarios);
}
exports.obterUsuarioPorId = async (req, res) => {
    const id = req.params.id;
    const usuario = await usuarioModel.findById(id);
    res.json(usuario);
}
exports.adicionarUsuario = async (req, res) => {
    const { nome, senha, email, ativo } = req.body;
    const novoUsuario = { nome, senha, email, ativo };
    await usuarioModel.create(novoUsuario);
    res.json(novoUsuario);
}
exports.deletarUsuario = async (req, res) => {
    const id = req.params.id;
    const usuario = await usuarioModel.findByIdAndDelete(id);
    if (usuario) {
        res.json({ message: 'Usuário deletado com sucesso' });
    } else {
        res.status(400).json({ message: 'Usuário não encontrado' });
    }
}
exports.atualizarUsuario = async (req, res) => {
    const id = req.params.id;
    const { nome, email, senha, ativo } = req.body;
    const usuario =
        await usuarioModel.findByIdAndUpdate(id,
            { nome, email, senha, ativo }, { new: true });
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(400).json({ message: 'Usuário não encontrado' });
    }
}

exports.autenticar = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await usuarioModel.findOne({ email, senha, ativo: true });
    if (usuario) {
        res.json({ autenticado: true });
    } else {
        res.status(401).json({ autenticado: false });
    }
}