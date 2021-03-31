import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name:'David',
            email:'email@example.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin: true,
        },
        {
            name:'Joe',
            email:'emails@example.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin: false,
        }
    ],
    products:[
        {
            _id: '1',
            name: 'Nike Slim Shirt',
            category:"Shirts",
            image:'/images/p1.jpeg',
            price:120,
            countInStock:10,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:'high quality product'
        },
        {
            _id: '2',
            name: 'Adidas Fit Shirt',
            category:"Shirts",
            image:'/images/p2.jpeg',
            price:100,
            countInStock:20,
            brand:'Adidas',
            rating:2.5,
            numReviews:8,
            description:'high quality product'
        },
        {
            _id: '3',
            name: 'Lacoste Free Shirt',
            category:"Shirts",
            image:'/images/p3.jpeg',
            price:220,
            countInStock:0,
            brand:'Lacoste',
            rating:4.8,
            numReviews:17,
            description:'high quality product'
        },
        {
            _id: '4',
            name: 'Nike Slim Pants',
            category:"Pants",
            image:'/images/p4.jpeg',
            price:78,
            countInStock:15,
            brand:'Nike',
            rating:4.5,
            numReviews:14,
            description:'high quality product'
        },
        {
            _id: '5',
            name: 'Puma Slim Pants',
            category:"Pants",
            image:'/images/p5.jpeg',
            price:65,
            countInStock:5,
            brand:'Puma',
            rating:4.2,
            numReviews:19,
            description:'high quality product'
        },
        {
            _id: '6',
            name: 'Adidas Fit Pants',
            category:"Pants",
            image:'/images/p6.jpeg',
            price:139,
            countInStock:12,
            brand:'Adidas',
            rating:3.5,
            numReviews:50,
            description:'high quality product'
        },
    ]
}

const navbar = {
    navitem:[
        {
            name:'Cart',
            url:'/cart'
        },
        {
            name:'Sign in',
            url:'/signin'
        },
    ]
}

export {
    data,
    navbar
}