import { ContenedorMysql } from "../../managers/ContenedorSQL.js";

class CartsDaoSQL extends ContenedorMysql{
    constructor(options,tableName){
        super(options,tableName);
    }
};

//const instancia = new CartsDaoSQL(options.sqliteDB, "carritos")

export {CartsDaoSQL};