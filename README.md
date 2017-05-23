![graphql](./assets/ng-ql-github.png)

# Making Full Stack Applications With Angular & GraphQL
---
## We will go through each of these steps
*If you are reading this because you are stuck, skip to a more helpful section below...*

##### *1. Start Our Project*
##### *2. Setup Our Apollo Server Flavor (express)*
##### *3. Connect to our database*
##### *4. Making a basic GraphQL schema*
##### *5. Adding Queries to our schema*
##### *6. Setup The Webpack Config For Our Server*
##### *7. Introduce Angular Into Our Project*
##### *8. Setup The Webpack Config For Angular*
##### *9. Create a Simple Client App*
##### *10. Summary*

---

## Starting Our Project

To start off we will create our package.json with
```bash
npm init
```
After that, we need to install the dependencies for our server.
The fastest way is for you to just copy from this [package.json](http://google.com), and then run
```bash
npm install
(or yarn install)
```

We have our projects dependencies, now lets get into the meat of the app. We are gonna make a few folders and files.

```
/node_modules          - Where all of our dependencies live their life out
/src                   - The typescript source of our app
  /client              - We will put our angular code in here
  /server              - Our server declaration and backend config go here
    /schema            - We will define our Graphql Schema in this folder
    main.ts            - The main function for our server
package.json           - You should make the files now
readme.md              - We'll be looking into the rest later
```
Your app structure should look like the above.

---

##  Setup Our Apollo Server
