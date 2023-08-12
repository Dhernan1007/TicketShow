 const validationId = async (req, res, next) => {
   const { id } = req.params;
   //regex para validar UUID
   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

   if (!id || !uuidRegex.test(id)) {
       res.status(400).send('Asegúrese de proporcionar un id válido');
   } else {
       next();
   }
}

module.exports = validationId
