import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import StringTools from './StringTools'
export default class EncryptionsController {
  public async encrypt({ request, response, session }: HttpContextContract) {
    const validateSchema = schema.create({
      password: schema.string({}),
    })

    const req = await request.validate({
      schema: validateSchema,
      messages: { 'password.required': 'Password field is required' },
    })

    console.log(req)
    let salt = StringTools.random(128)
    console.log('\n Salt : ' + salt)
    let hash = StringTools.hmac('test', salt)
    session.put('data', { salt, hash })
    await session.commit()
    console.log('Hashed PWD :' + hash)
    console.log('\n Salt : ' + salt)
    return response.redirect('result')
  }
}
