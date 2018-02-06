
///////////////////////////////////////////////////////////////////////
/////////////////// configure client object       ////////////////////
//////////////////////////////////////////////////////////////////////
const uuidv1 = require('uuid/v1');

const objStore = [
  {
	name: "Acme Industries",
	image: 'https://randomuser.me/api/portraits/men/7.jpg',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
  id: uuidv1(),
	contact: 'Bill Smith',
	phone: '704-555-1212'
  },
  {
	name: "Beta Industries",
	image: 'https://randomuser.me/api/portraits/men/14.jpg',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
  id: uuidv1(),
	contact: 'Bill Jones',
	phone: '704-555-1212'
  },
  {
	name: "Alpha Industries",
	image: 'https://randomuser.me/api/portraits/men/91.jpg',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
  id: uuidv1(),
	contact: 'Bill Alpha',
	phone: '704-555-1212'
  },
  {
  name: "Pivot and Scale",
  image: 'https://randomuser.me/api/portraits/men/62.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Annapolis',
  state:'MD',
  zip: '12345',
  id: uuidv1(),
  contact: 'Dave',
  phone: '+17042282288'
  },
  {
  name: "Medical Center",
  image: 'https://randomuser.me/api/portraits/women/94.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Annapolis',
  state:'MD',
  zip: '12345',
  id: uuidv1(),
  contact: 'Nurse',
  phone: '+17045551212'
  },
  {
  name: "Software company",
  image: 'https://randomuser.me/api/portraits/men/73.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  id: uuidv1(),
  contact: 'Mike',
  phone: '+17045551111'
  },
  {
  name: "Utility",
  image: 'https://randomuser.me/api/portraits/women/27.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  id: uuidv1(),
  contact: 'Uko',
  phone: '+19192223333'
  },
  {
  name: "IBM",
  image: 'https://randomuser.me/api/portraits/women/36.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Armonk',
  state:'NY',
  zip: '12345',
  id: uuidv1(),
  contact: 'Janna',
  phone: '+12124454444'
  },
  {
  name: "xio partners",
  image: 'https://randomuser.me/api/portraits/men/83.jpg',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  id: uuidv1(),
  contact: 'Pat',
  phone: '+17044445555'
  }

]

module.exports = objStore;
