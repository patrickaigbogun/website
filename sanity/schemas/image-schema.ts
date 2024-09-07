import { RuleType } from "@/types/components";


const ImageSchema = {
	
	name: 'imageObject', // Changed from 'person' to 'imageObject'
	title: 'Image',
	type: 'object',
	fields: [
	  {
		name: 'image',
		type: 'image',
		title: 'Image',
		options: {
		  hotspot: true,
		},
	  },
	  {
		name: 'alt',
		type: 'string',
		title: 'Alternative Text',
		validation: (rule: RuleType) => rule.required().warning('Alt text is important for accessibility'),
	  },
	],
  };
  
export default ImageSchema;