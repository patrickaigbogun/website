import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk'


const config = defineConfig({

projectId: 'd8emt0pr',

dataset: 'production',

title: 'my personal website',

apiVersion: '2024-06-30',

basePath: '/admin',

plugins: [deskTool()],

})

export default config;