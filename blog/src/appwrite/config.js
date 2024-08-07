import conf from "../conf/conf";
import { Client , ID ,Databases,Storage,Query} from "appwrite";




export class Service{

    client = new Client()
    databases;
    bucket;
    constructor() {
        this.client
         .setEndpoint(conf.appWriteUrl)
         .setProject(conf.appWriteProjectId);
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, content , slug,featuredImage,status,userID}) {
       try {
        return await this.databases.createDocument(
            conf.appWriteDatabaseid,
            conf.appWriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userID
            }
        )
        
       } catch (error) {
        console.log("AppWrite service ::createpost :: error",error)
       }
}

    async updatePost(slug , {title, content  ,featuredImage,status}) {
        try {
         return await this.databases.updateDocument(
             conf.appWriteDatabaseid,
             conf.appWriteCollectionId,
             slug,
             {
                 title,
                 content,
                 featuredImage,
                 status,
                 
             }
         )
         
        } catch (error) {
         console.log("AppWrite service ::updatepost :: error",error)
        }
 }


    async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
          conf.appWriteDatabaseid,
          conf.appWriteCollectionId,
          slug
      )
      return true;
     }
     catch (error) {
     console.log("AppWrite service ::deletepost :: error",error)
     return false ;
        }
 }

    async getPost() {
        try {
            const data = await this.databases.listDocuments(
                conf.appWriteDatabaseid,
                conf.appWriteCollectionId,
                slug
            )
            return data;
        } catch (error) {
            console.log("AppWrite service ::getposts :: error",error)
            return false;
        }
 }


    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            const data = await this.databases.listDocuments(
                conf.appWriteDatabaseid,
                conf.appWriteCollectionId,
                queries
            )
            return data;
        } catch (error) {
            console.log("AppWrite service ::getposts :: error",error)
            return false;
        }
    }

//file upload services

 async uploadFile(file) {
    try {
        const result = await this.bucket.createFile(
            conf.appWriteBucketId,
            ID.unique(),
            file
        )
        return result;
    } catch (error) {
        console.log("AppWrite service ::uploadfile :: error",error)
        return false;
    }
 }

 //delete file services

 async deleteFile(fileId) {
    try {
        const result = await this.bucket.deleteFile(
            conf.appWriteBucketId,
            fileId
        )
        return result;
    } catch (error) {
        console.log("AppWrite service ::deletefile :: error",error)
        return false;
    }
 }


 getFilePreview(fileId) {
    try {
        const result =  this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )       
        return result;  
    } catch (error) {
        console.log("AppWrite service ::getfilepreview :: error",error)
        return false;
    }

}
}

const service = new Service();

export default service