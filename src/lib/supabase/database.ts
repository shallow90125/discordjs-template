export type Json = { [key: string]: Json | undefined } | boolean | Json[] | null | number | string

export type Database = {
  public: {
    CompositeTypes: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Tables: {
      guild: {
        Insert: {
          guild: string
          subscribed?: boolean
        }
        Relationships: []
        Row: {
          guild: string
          subscribed: boolean
        }
        Update: {
          guild?: string
          subscribed?: boolean
        }
      }
      keep: {
        Insert: {
          created_at?: string
          guild: string
          member: string
          roles: string[]
        }
        Relationships: []
        Row: {
          created_at: string
          guild: string
          member: string
          roles: string[]
        }
        Update: {
          created_at?: string
          guild?: string
          member?: string
          roles?: string[]
        }
      }
      sync: {
        Insert: {
          guild: string
          members: string[]
          name: string
          syncing: boolean
        }
        Relationships: [
          {
            columns: ['guild']
            foreignKeyName: 'sync_guild_fkey'
            isOneToOne: false
            referencedColumns: ['guild']
            referencedRelation: 'guild'
          },
        ]
        Row: {
          guild: string
          members: string[]
          name: string
          syncing: boolean
        }
        Update: {
          guild?: string
          members?: string[]
          name?: string
          syncing?: boolean
        }
      }
      unique: {
        Insert: {
          guild: string
          name?: string
          roles: string[]
        }
        Relationships: [
          {
            columns: ['guild']
            foreignKeyName: 'unique_guild_fkey'
            isOneToOne: false
            referencedColumns: ['guild']
            referencedRelation: 'guild'
          },
        ]
        Row: {
          guild: string
          name: string
          roles: string[]
        }
        Update: {
          guild?: string
          name?: string
          roles?: string[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends { schema: keyof Database } | keyof (PublicSchema['Tables'] & PublicSchema['Views']),
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends { schema: keyof Database } | keyof PublicSchema['Tables'],
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends { schema: keyof Database } | keyof PublicSchema['Tables'],
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends { schema: keyof Database } | keyof PublicSchema['Enums'],
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends { schema: keyof Database } | keyof PublicSchema['CompositeTypes'],
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
