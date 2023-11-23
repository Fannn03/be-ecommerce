import fs from 'fs'
import path from 'path'

const imagesFolder = [
  'stores',
  'users',
  'documents',
  'products',
  'temp'
]

export default () => {
  if(!fs.existsSync('./public')) fs.mkdirSync('./public')
  if(!fs.existsSync('./public/images')) fs.mkdirSync('./public/images')

  const imagesPath = path.join('./public/images')
  const folders = fs.readdirSync(imagesPath)

  if(folders.length != imagesFolder.length) {
    for(let folder of folders) {
      imagesFolder.find((name: string) => {
        if(name != folder) {
          try {
            fs.mkdirSync(`${imagesPath}/${name}`)
          } catch (err) {
            console.log('skipping folder exists')
          }
        }
      })
    }
  }
}