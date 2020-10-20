
export const Roles= {
    Admin:'admin',
    Viewer:'view'
}
export const Users = [
    { id: 1, username: 'admin', password: 'admin@123', firstName: 'Admin', lastName: 'User', role:Roles.Admin, phone:'+1 999-999-9999',email:'admin@email.com',roleDescr:'Admin role will have access to all functionality like add update and delete of products.' },
    { id: 2, username: 'viewer', password: 'viewer@123', firstName: 'Viewer', lastName: 'User', role:Roles.Viewer,phone:'+1 222-2222-2222',email:'viewer@email.com',roleDescr:'Viewer role will only be able to view product but he can not update or delete product.' }
]
