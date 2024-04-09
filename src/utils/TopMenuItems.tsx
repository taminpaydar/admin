export const menuitem = [
    {
        url: '/Dashboard',
        icon: '/assets/menuboard.svg',
        name: 'home',
        show:false,
        sub:[]
    },
    {
        url: '/Dashboard/Articles',
        icon: '/assets/insert.svg',
        name: 'Articles',
        show:true,
        sub:[
            {
                url: '/Dashboard/Articles/Groups',
                name: 'Article Group',
                icon: '/assets/folder-with-files-svgrepo-com.svg'
            },
            {
                url: '/Dashboard/Articles/Blogs',
                name: 'Articles',
                icon: '/assets/insert.svg'
            },
            {
                url: '/Dashboard/Articles/Article/new',
                name: 'New Articles',
                icon: '/assets/pen-new-round-svgrepo-com.svg'
            },
            // {
            //     url: '/Dashboard/Tags',
            //     name: 'Tags',
            //     icon: '/assets/tags-label-svgrepo-com.svg'
            // },
        ]
    },
    {
        url: '/Dashboard/Setting',
        icon: '/assets/arrowdown.svg',
        name: 'Products',
        show:true,
        sub:[
            {
                url: '/Dashboard/Products/Group',
                name: 'Products Group',
                icon: '/assets/uploader.svg'
            },
            {
                url: '/Dashboard/Products/Items',
                name: 'Products',
                icon: '/assets/box-shipping.svg'

                
            },
            {
                url: '/Dashboard/Products/Invoices',
                name: 'Orders',
                icon: '/assets/invoice.svg'

                
            },
            {
                url: '/Dashboard/Products/Company',
                name: 'Companies',
                icon: '/assets/folders.svg'
                
            },
            {
                url: '/Dashboard/Products/vehiclelist',
                name: 'Vehicle List',
                icon: '/assets/folders.svg'
                
            },
            {
                url: '/Dashboard/Products/DiscountCode',
                name: 'Discount Code',
                icon: '/assets/discount.svg'
            },
            {
                url: '/Dashboard/Products/Discount',
                name: 'Discounts',
                icon: '/assets/discount.svg'
            },
            {
                url: '/Dashboard/Products/Pricing',
                name: 'Pricing',
                icon: '/assets/discount.svg'
            },
        ]
    },
    {
        url: '/Dashboard/Setting',
        icon: '/assets/penedit.svg',
        name: 'Settings',
        show:true,
        sub:[
            {
                url: '/Dashboard/Setting/General',
                name: 'General',
                icon: '/assets/setting-5-svgrepo-com.svg'

            },
            {
                url: '/Dashboard/Setting/Contactus',
                name: 'Contact us',
                icon: '/assets/contact-book-2-svgrepo-com.svg'

                
            },
            {
                url: '/Dashboard/Setting/Social',
                name: 'Social Networks',
                icon: '/assets/social-share-svgrepo-com.svg'

                
            },
            {
                url: '/Dashboard/Setting/Market',
                name: 'Market Setting',
                icon: '/assets/market.svg'

                
            },
           
        ]
    },
    // {
    //     url: '/Dashboard/Macreemedy',
    //     icon: '/assets/penedit.svg',
    //     name: 'Macremedy',
    //     show:true,
    //     sub:[
    //         {
    //             url: '/Dashboard/Mac/Users',
    //             name: 'Users',
    //         },
    //         {
    //             url: '/Dashboard/Mac/Contact',
    //             name: 'Services',
    //         },
    //         {
    //             url: '/Dashboard/Setting/Social',
    //             name: 'Doctors',
    //         },
    //         {
    //             url: '/Dashboard/Setting/Social',
    //             name: 'List ',
    //         },
           
    //     ]
    // },
    {
        url: '/Dashboard/Gallery',
        icon: '/assets/eye.svg',
        name: 'Gallery',
        show:true,
        sub:[
            {
                url: '/Dashboard/Gallery/Gallery',
                name: 'Gallery',
                icon: '/assets/gallery-wide-svgrepo-com.svg'
            },
            {
                url: '/Dashboard/Gallery/Sliders',
                name: 'Sliders',
                icon: '/assets/slider-vertical-svgrepo-com.svg'
            }
           
        ]
    },
    {
        url: '/Dashboard/Menus',
        icon: '/assets/justify.svg',
        name: 'Menus',
        show:true,
        sub:[
            {
                url: '/Dashboard/Menus/Group',
                name: 'Menu Manager',
                icon: '/assets/menu2-svgrepo-com.svg'

            },
           
           
        ]
    },
    // {
    //     url: '/Dashboard/Users',
    //     icon: '/assets/avatar.svg',
    //     name: 'Users',
    //     show:true,
    //     sub:[
    //         {
    //             url: '/Dashboard/Users',
    //             name: 'User Manager',
    //             icon: '/assets/users-svgrepo-com.svg'

    //         },
           
           
    //     ]
    // },
]