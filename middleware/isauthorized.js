const jwt = require('jsonwebtoken');

module.exports =async (req, res, next)=>{
    //  console.log(req.headers.authorization);
    if(!req.headers.authorization)
    return res.status(401).json({error:'not authenticated'});

    const token = req.headers.authorization.split(" ")[1];
    //  console.log(token);
    const verified =  await jwt.verify(token,'aja_mexico_chaliae');
    // console.log(verified);
    if(!verified)
    return res.status(401).json({error: 'not authenticated'});

    req.body.username = verified.username;
    next();
    
}