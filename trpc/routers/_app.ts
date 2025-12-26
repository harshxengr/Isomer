// import { z } from 'zod';
import prisma from '@/lib/db';
import { baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
import { inngest } from '@/inngest/client';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({
  textAi: premiumProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai"
    })
    
    return {success: true, message: "Job queued"}
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "saini@gmail.com"
      }
    })
    
    return {success: true, message: "Job queued"}
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;