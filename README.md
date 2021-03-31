# TypeORM tricks

The initial state of our tutorial is a simple `user` entity as follows:

```sh
@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

and this user has a ManyToMany relation with `tag` entity

```sh
@Entity()
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

i made a playground site to test out the tricks on: `playground url`

for now we can add users and the system can asign random tags for each one

## Tricks

1. Sort a Relation Array (sometimes we can't sort by name or date so we make our own sort)
2. fetching by tag gets only that tag (workaround to get all tags for a user by tag)

## Sort a Relation Array

the first problem that one might have with arrays of relations is the sort problem
even when assigning the tags we sort them when fetching them the order will be lost
to fix this issue we can add an extra column to the tags naming it index for example
and then when fetching we sort using the index

our `tag` entity will became like follows:

```sh
@Entity()
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User)
  users: User[];

  @Column()
  index: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

and when fetching we just add the order by index:

```sh
User.createQueryBuilder("user")
    .leftJoinAndSelect("user.tags", "tags")
    .orderBy("tags.index")
    .getMany();
```

## fetching by tag gets only that tag (workaround to get all tags for a user by tag)

for example we want to get all the users that have the tag DEVELOPER, we would try something like this

```sh
User.createQueryBuilder("user")
    .leftJoinAndSelect("user.tags", "tags")
    .where(`tags.name = 'DEVELOPER'`)
    .orderBy("tags.index")
    .getMany();
```

yes we will get all the users with the developer tag, but the problem here is
we will get the users with tags array containing only ['DEVELOPER']

a trick to go around this is to use the same relation twice, we select the tags
relation twice one for search and another time for the returened array like follows:

```sh
User.createQueryBuilder("user")
    .leftJoinAndSelect("user.tags", "searchTags")
    .leftJoinAndSelect("user.tags", "tags")
    .where(`searchTags.name = 'DEVELOPER'`)
    .orderBy("tags.index")
    .getMany();
```

this way we select all the user that have the tags with all thier tags with them.

## setup

### prerequisite

1. preapre a postgres db
2. change the ormconfig.json to match your config

### instal and setup server

1. `yarn global add nodemon ts-node` or `npm i -g nodemon ts-node`
2. `yarn` or `npm install`
3. `yarn start` or `npm start`

### install and setup client

1. `yarn` or `npm install`
2. `yarn start` or `npm start`
