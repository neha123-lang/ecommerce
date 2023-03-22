import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'ecommerce',

  projectId: 'tqk7s1nd',
  dataset: 'products',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
