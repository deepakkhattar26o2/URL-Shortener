const validurl = require('valid-url')
const config = require('config')
const URL = require('../models/URL')
const  nanoid  = require('nanoid')

exports.shorten = (req, res, next)=>
{
    const longUrl = req.body.url;
    const localURL = config.get('localURL')
    if(!validurl.isUri(localURL)){
        return res.status(409).json({Message: 'Invalid Base URL'})
    }
    const urlCode = nanoid.nanoid(6);
    if(validurl.isUri(longUrl)){
        URL.findOne({longUrl: longUrl}).select("shortUrl longUrl urlCode date").exec().then(url=>
            {
                if(url)
                {
                    res.status(200).json(url)
                }
                else{
                    const shortUrl = localURL + '/'+ urlCode
                    const newurl = new URL({
                        urlCode: urlCode,
                        longUrl: longUrl,
                        shortUrl: shortUrl,
                        date : new Date()
                    })

                    newurl.save().then(
                        doc=>{
                            res.status(200).json(doc.shortUrl)
                        }
                    ).catch(err=>{res.status(500).json({Message: err})})
                }
            }
        ).catch(err=>{
            res.status(500).json({Message: err})
        })
    }
    else{
        res.status(409).json({Message: 'Invalid URL!'})
    }
}

exports.redirect =  (req, res, next)=>{
    URL.findOne({urlCode: req.params.code}).exec().then(url=>{
        if(url){
            res.redirect(url.longUrl)
        }
        else{
            res.status(404).json({Message: 'No URL Found!'})
        }
    }).catch(err=>{
        res.status(500).json({Message: err})
    })
}

exports.getStats = (req, res, next)=>{
    URL.findOne({urlCode: req.params.code}).select("longUrl shortUrl date").exec().then(url=>{
        if(url){
            res.status(200).json(url)
        }
        else{
            res.status(404).json({Message: 'No URL Found!'})
        }
    }).catch(
        err=>{
            res.status(500).json({Message: err})
        }
    )
}

exports.deleteByCode = (req, res, next)=>{
    URL.deleteOne({urlCode: req.params.code}).exec().then(
        result=>{
            res.status(200).json({result})
        }
    ).catch(
        err=>{
            res.status(500).json({Message: err})
        }
    )
}
