# Project Readme

The initial state of this project is based on the first step of the Amplify tutorial, 
as specified here https://docs.amplify.aws/start/getting-started/setup/q/integration/js/. No further config has 
been done at this stage. Let's go! 

For the video walkthrough of setting up this with Amplify, see https://youtu.be/B2rWei4IkO4

## Step 1

Make sure we have a running clientside setup. 

## Step 2 

Configure Amplify. In order to make Amplify happy, one need to add auth even if we're not using it
in this example. Since you're using wallet-based identification, presumably you already have an 
auth-plug for this. 

Next, you'll notice we name the hash key and sort key for dynamodb to "pk" and "sk". This might seem weird, 
but is actually considered best practice, since we'll be doing what's known as a "sparse table". For more info on this,
see the resources linked at the bottom of this readme. Let's go!

Now, we wait for amplify to initialise the project properly. While we do that, let's add some interface. Like a good
TV chef, I've prepared some things. 

## Step 3

Actually add the API and database. We'll add a REST-API provided via a lambda - since the GraphQL-version is way 
over-complex for this kind of simple operations. Let's go! 

Note - we're not adding any global indexes, nor are we adding any lambda triggers - cause we don't need any of that here!

While amplify is provisioning our API, let's discuss dynamodb. 

So, dynamodb is not a relational database, which means that we access it in a slightly different fashion. The hash key can 
be considered the primary key, and the sort key is a sort if primary key divider. You'll see what I mean in a minute. 

The API we just configured provides simple CRUD-operations against a single DDB-table. Some resources you'll find recommend using a 
separate DDB-table for each sort of entity in your system, but this is bullshit. DDB powers the entirety of Amazon.com with 3 tables, 
which is why it's so fast. 

Now, global indexes and lambda triggers are nice when you need them, but in order to understand global indexes and when you actually need them, I recommend ready the DynamoDB Book by Brie - which is worth every single penny if you want to work efficiently with cloud and AWS, see the link at the bottom of this document. Now, we'll wait for this to provision properly. 

## Step 4

Okey, we're good to go. Let's return to our UI. 

Cool, we have an UI. Let's add some functionality. 

Okey, cool - with a small javascript-function, we can write stuff to our database. Let's read it back out!

Okey, awesome - we can also read from the database. Let's add some shipping info!

The weird structure in DDB you just saw is what's called a "sparse database". We use the wallet-reference ("wallet-123") as the identifying
marker, then we split up the object referenced by "wallet-123" into separate, logical components - in this case "user-info" and "shipping-info". This is the magic sauce behind how DDB is so wickedly fast. Let's read out that shipping info again!

## Step 5

Okey, looks cool - and we have simple javascript-functions to read/write/update whatever. How does this actually work?

In the amplify setup you saw earlier, we asked amplify to provision us a CRUD-API for operations against our DDB-table, which is just what it did. Let's take a look at it.

Okey, as we can see it sets up an ExpressJS-app inside the lambda, let's look through it. 

Cool, within that ExpressJS-app we have a small server that provides all the separate operations we need, regardless of update/delete/create or whatever. 

## Step 6

There is no step 6.

## Resources

The DDB Book - the best single point of mastering DDB, worth every single cent. https://www.dynamodbbook.com 