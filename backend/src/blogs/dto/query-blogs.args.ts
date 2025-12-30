import { registerEnumType } from '@nestjs/graphql';

export enum BlogSortField {
  CREATED_AT = 'createdAt',
  TITLE = 'title',
}

registerEnumType(BlogSortField, {
  name: 'BlogSortField',
});

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});
