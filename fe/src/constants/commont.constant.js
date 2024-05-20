export const MENU_URL = {
    // ADMIN: {
    //     LOGIN: "/login/admin-menu",
    //     CUS_MANAGE: "/admin/users",
    //     PRO_MANAGE: "/admin/products",
    //     CATEGORY_MANAGE: "/admin/categories",
    // },
    CUSTOMER: {
        HOME:"/products",
        STORE:"/products",
        PRODUCTS:"/products",
        POSTS:"/post",
        CONTACT:"/contact",
        REGIS: "/register",
    },
};

export const BUTTON_TEXT = {
    ADD: "Add",
    UPDATE: "Update",
    DEL: "Delete",
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
};
