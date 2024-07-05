import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    AutoIncrement,
    Default,
  } from "sequelize-typescript";
  
  @Table
  class Transaction extends Model<Transaction> {
    @PrimaryKey
    @Column
    id: string;
  
    @Column
    customerId: string;
  
    @Column
    amount: number;

    @Column
    orderId: number;
  
    @CreatedAt
    @Column
    createdAt: Date;
  
    @UpdatedAt
    @Column
    updatedAt: Date;
  }
  
  export default Transaction;
  