var listaUsuarios = [];

exports.listarUsuarios = (req, res) => {
    res.json(listaUsuarios);
}
exports.obterUsuarioPorId = (req, res) => {
    const id = req.params.id;
    const usuario = listaUsuarios.find(usuario => usuario.id == id);
    res.json(usuario);
}
exports.adicionarUsuario = (req, res) => {
    const { id, nome, email } = req.body;
    const novoUsuario = { id, nome, email };
    listaUsuarios.push(novoUsuario);
    res.json(novoUsuario);
}
exports.deletarUsuario = (req, res) => {
    const id = req.params.id;
    const index = listaUsuarios.findIndex(usuario => usuario.id == id);
    if (index !== -1) {
        const usuarioDeletado = listaUsuarios.splice(index, 1);
        res.json(usuarioDeletado[0]);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
}
exports.atualizarUsuario = (req, res) => {
    const id = req.params.id;
    const { nome, email } = req.body;
    const usuario = listaUsuarios.find(usuario => usuario.id == id);
    if (usuario) {
        usuario.nome = nome;
        usuario.email = email;
        res.json(usuario);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
}