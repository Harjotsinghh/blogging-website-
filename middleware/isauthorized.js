const jwt = require('jsonwebtoken');

module.exports =async (req, res, next)=>{
    //  console.log(req.headers.authorization);
    
    if(!req.headers.authorization)
    return res.status(401).json({error:'not authenticated'});

    const token = req.headers.authorization.split(" ")[1];
    try{
      const verified= await jwt.verify(token,'aja_mexico_chaliae');
      req.body.username = verified.username
    }   
    catch(err){
        try{
            const rtoken = req.cookies.rtoken
            const verifyRtoken = await jwt.verify(rtoken,'aja_mexico_chaliae')
            req.body.username= verifyRtoken.username
            res.body.token = await jwt.sign({username: username},'aja_mexico_chaliae',{expiresIn : '1d'} )
            next()
        }
        catch(err){
            return res.status(401).json({err: 'not autorized'})
        }
       
    }
   
  
    next();
    
}

