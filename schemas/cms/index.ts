import author from './author-schema';
import blogPost from './blogPost-schema';
import page from './page-schema';
import profile from './profile-schema';
import project from './project-schema';
import tags from './tag';
import category from './category';
import series from './series';

const schemas = [
	project,
	page,
	blogPost,
	author,
	profile,
	tags,
	category,
	series,
];

export default schemas;
