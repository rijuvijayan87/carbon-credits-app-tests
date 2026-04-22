import { z } from "zod";

export const ListingFeeTierSchema = z.object({
  MinimumTierPrice: z.number(),
  FixedFee: z.number(),
});

export const FeesSchema = z.object({
  Bundle: z.number(),
  EndDate: z.number(),
  Feature: z.number(),
  Gallery: z.number(),
  Listing: z.number(),
  Reserve: z.number(),
  Subtitle: z.number(),
  TenDays: z.number(),
  ListingFeeTiers: z.array(ListingFeeTierSchema),
  SecondCategory: z.number(),
});

export const PromotionSchema = z.object({
  Id: z.number(),
  Name: z.string(),
  Description: z.string(),
  Price: z.number(),
  OriginalPrice: z.number().optional(),
  Recommended: z.boolean().optional(),
  MinimumPhotoCount: z.number(),
});

export const CategorySchema = z.object({
  CategoryId: z.number(),
  Name: z.string(),
  Path: z.string(),
  CanListAuctions: z.boolean(),
  CanListClassifieds: z.boolean(),
  CanRelist: z.boolean(),
  LegalNotice: z.string(),
  DefaultDuration: z.number(),
  AllowedDurations: z.array(z.number()),
  Fees: FeesSchema,
  FreePhotoCount: z.number(),
  MaximumPhotoCount: z.number(),
  IsFreeToRelist: z.boolean(),
  Promotions: z.array(PromotionSchema),
  EmbeddedContentOptions: z.array(z.unknown()),
  MaximumTitleLength: z.number(),
  AreaOfBusiness: z.number(),
  DefaultRelistDuration: z.number(),
  CanUseCounterOffers: z.boolean(),
});

export type Category = z.infer<typeof CategorySchema>;
