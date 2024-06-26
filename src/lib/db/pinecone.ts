import { Pinecone } from '@pinecone-database/pinecone'
import { downloadFromS3 } from '../s3-server';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
// import { PineconeClient } from "@pinecone-database/pinecone";



let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

export async function loadS3IntoPinecone(file_key: string) {
    //  1. obtain the pdf -> download and read from pdf
    console.log('downloading s3 into file system')
    const file_name = await downloadFromS3(file_key);
    if(!file_name) {
        throw new Error('could not downlod from s3')
    }
    const loader = new PDFLoader(file_name)
    const pages = await loader.load()
    return pages;
}