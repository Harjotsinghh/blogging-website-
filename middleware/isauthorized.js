const jwt = require('jsonwebtoken');

module.exports =async (req, res, next)=>{
    //  console.log(req.headers.authorization);

    if(!req.headers.authorization)
    return res.status(401).json({error:'not authenticated'});

    const token = req.headers.authorization.split(" ")[1];
    const verified =  jwt.verify(token,'aja_mexico_chaliae',{ignoreExpiration:true});
    var err = ( Date.now() < verified.exp *1000 );
    console.log(verified.exp *1000);
    if(!err)
    {
        const rtoken = req.cookies.rtoken
        console.log(rtoken)
        const verify = await jwt.verify(rtoken,'aja_mexico_chaliae')
        if(!verify)
        return res.status(401).json({error: 'not authenticated'});
        const newtoken = await jwt.sign({username:verify.username},'aja_mexico_chaliae',expiresIn = '2h')
        res.body.token = newtoken
        verified=verify
    }
  

    req.body.username = verified.username;
    next();
    
}