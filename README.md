# HotPost

HotPost is a social platform where users can post and view posts from others. Users can also manage their profiles, and create, read, update, or delete posts if they are the creator. This project is built using **Next.js**, and incorporates **authentication via Google** using `next-auth`.

## Features

- **User Authentication**: Sign in using Google OAuth via `next-auth/react`.
- **Post Management**:
  - **Create Posts**: Users can create new posts.
  - **Read Posts**: View posts made by other users.
  - **Update Posts**: Edit posts if the user is the original creator.
  - **Delete Posts**: Delete posts if the user is the original creator.
- **User Profiles**: View user profiles and see posts they've created.
- **Responsive Design**: Mobile-friendly design.

## Technologies Used

- **Next.js**: Framework for building the application.
- **next-auth/react**: Authentication with Google OAuth.
- **MongoDB** (or your preferred database): Stores posts and user data.
- **Tailwind CSS** For styling (can be customized or replaced with any preferred CSS framework).

## Prerequisites

Before running this project, you need to set up the following:

- **Node.js**: Ensure you have Node.js installed (version 14.x or higher recommended).
- **Google OAuth Credentials**: You'll need to set up Google OAuth for authentication. Follow the instructions on the [NextAuth.js documentation](https://next-auth.js.org/getting-started/introduction).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Eunum56/hot_post
   cd HotPost
   ```

2. Install the dependencies:

   ```bash
   npm i or npm install
   ```

3. Set up environment variables:

Create a `.env` file at the root of the project and add the following:

    ```bash
    GOOGLE_ID=?
    GOOGLE_CLIENT_SECRET=?
    MONGODB_URI=?
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_URL_INTERNAL=http://localhost:3000
    NEXTAUTH_SECRET=?
    ```

Replace the values with your own Google OAuth credentials and MongoDB connection string.

4. Run the development server:

   ```bash
   npm run dev
   ```

## Usage

**Authentication** :

- Navigate to the home page, where you will be prompted to sign in using Google.

- Once authenticated, you can create, view, update, and delete posts.

**Creating a Post** :

- After signing in, you will have an option to create a new post.

- Enter your post content, click "Create Post", and your post will be added to the feed.

**Viewing Posts** :

- On the homepage, you will see all publicly visible posts.

- Each post displays the creator's username and content.

**Updating/Deleting Posts** :

- Only the creator of a post can edit or delete their post.

- Click the "Edit" button on a post to modify it, or the "Delete" button to remove it.

**User Profiles** :

- Each user has a profile page, where they can see the posts they have created.

## Demo

You can view live demo here : https://hot-post.vercel.app/

## Contributing

Feel free to fork this repository and submit pull requests. If you have suggestions or encounter any bugs, please open an issue in the GitHub repository.
