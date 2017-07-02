// Type definitions for squel 5.10
// Project: https://github.com/hiddentao/squel#readme
// Definitions by: deziev <https://github.com/deziev>, hiddentao <https://github.com/hiddentao>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare namespace Squel {

    interface Handler {
        (...args: any[]): any;
    }

    interface Select {
        distinct(): Select;
        field(name: string | any, alias?: string, options?: any): Select;
        fields(fields: Object | any[]): Select;
        from(name: string | Select, alias?: string): Select;
        join(name: string, alias?: string, condition?: string | any): Select;
        left_join(name: string, alias?: string, condition?: string | any): Select;
        right_join(name: string, alias?: string, condition?: string | any): Select;
        outer_join(name: string, alias?: string, condition?: string | any): Select;
        cross_join(name: string, alias?: string, condition?: string | any): Select;
        where(condition: string | Expression, ...args: any[]): Select;
        order(field: string, direction?: boolean, ...args: any[]): Select;
        group(field: string): Select;
        having(condition: string | any, ...args: any[]): Select;
        limit(limit: number): Select;
        offset(limit: number): Select;
        top(num: number): Select;
        clone(): Select;
        toString(): string;
        toParam(options?: Object, numberedParametersStartAt?: number): { text: string, values: any[] };
        union_all(query: Select): Select;
        with(alias: string, table: Select | Insert | Update | Delete): Select;
    }

    interface Insert {
        into(name: string): Insert;
        set(name: string, value: any, options?: {  autoQuoteFieldNames?: boolean, dontQuote?: boolean }): Insert;
        setFields(fields: Object, options?: { ignorePeriodsForFieldNameQuotes?: boolean }): Insert;
        setFieldRows(fields: Object[], options?: { ignorePeriodsForFieldNameQuotes?: boolean }): Insert;
        fromQuery(columns: string[], selectQry: Select): Insert;
        onDupUpdate(name: string, value: any, options? : { ignorePeriodsForFieldNameQuotes?: boolean, dontQuote?: boolean}): Insert;
        output(name: string|string[]): Insert;
        returning(str: string): Insert;
        updateOptions(options: Object): Insert;
        registerValueHandler<T>(type: T|string, handler: Handler): Insert;
        isNestable(): boolean;
        clone(): Insert;
        toString(): string;
        toParam(options?: { numberedParametersStartAt?: number }): { text: string, values: any[] };
        with(alias: string, table: Select | Insert | Update | Delete): Select;
    }

    interface  Update {
        table(name: string, alias?: string): Update;
        set(name: string, value?: any, options?: { ignorePeriodsForFieldNameQuotes?: boolean, dontQuote?: boolean}): Update;
        setFields(fields: Object, options?: { ignorePeriodsForFieldNameQuotes?: boolean }): Update;
        where(condition: string, ...args: any[]): Update;
        limit(limit: number): Update;
        offset(limit: number): Update;
        output(name: string, alias?: string): Update;
        outputs(fields: Object): Update;
        returning(str: string): Update;
        updateOptions(options: Object): Update;
        registerValueHandler(type: any, handler: Handler): Insert;
        isNestable(): boolean;
        clone(): Insert;
        toString(): string;
        toParam(options?: { numberedParametersStartAt?: number }): { text: string, values: any[] };
        with(alias: string, table: Select | Insert | Update | Delete): Select;
    }

    interface Delete {
        trget(table: string): Delete;
        from(table: string, alias?: string): Delete;
        join(name: string, alias?: string, condition?: string): Delete;
        left_join(name: string, alias?: string, condition?: string): Delete;
        right_join(name: string, alias?: string, condition?: string): Delete;
        outer_join(name: string, alias?: string, condition?: string): Delete;
        where(condition: string, ...args: any[]): Delete;
        limit(limit: number): Delete;
        offset(limit: number): Delete;
        output(name: string, alias?: string): Delete;
        outputs(fields: Object): Delete;
        returning(str: string): Delete;
        updateOptions(options: Object): Delete;
        registerValueHandler<T>(type: T|string, handler: Handler): Delete;
        isNestable(): boolean;
        clone(): Delete;
        toString(): string;
        toParam(options?: { numberedParametersStartAt?: number }): { text: string, values: any[] };
        with(alias: string, table: Select | Insert | Update | Delete): Select;
    }

    interface QueryBuilderOptions {
        autoQuoteAliasNames?: boolean;
        autoQuoteFieldNames?: boolean;
        autoQuoteTableNames?: boolean;
        customValueHandlers?: Handler[];
        fieldAliasQuoteCharacter?: string;
        nameQuoteCharacter?: string;
        nestedBuilder?: boolean;
        numberedParametersStartAt? :number;
        replaceSingleQuotes?: boolean;
        separator?: string;
        singleQuoteReplacement?: string;
        tableAliasQuoteCharacter?: string;
        useAsForTableAliasNames?: boolean;
    }

    interface QueryBuilder {
        
        select(options?: QueryBuilderOptions, blocks?: Object[]): Select;
        insert(options?: QueryBuilderOptions, blocks?: Object[]): Insert;
        update(options?: QueryBuilderOptions, blocks?: Object[]): Update;
        delete(options?: QueryBuilderOptions, blocks?: Object[]): Delete;
        remove(options?: QueryBuilderOptions, blocks?: Object[]): Delete;
        expr(): Expression;
    }

    interface Expression {
        and(expr: string | Expression, options?: Object): Expression;
        or(expr: string | Expression, options?: Object): Expression;
        clone(): Expression;
        toString(): string;
        toParam(): { text: string, values: any[] };
    }

    interface SquelStatic extends QueryBuilder {
        useFlavour(s: string): QueryBuilder;
        VERSION: string;
        registerValueHandler<T>(type: T, handler: Handler): SquelStatic;
    }
}

declare const squel: Squel.SquelStatic;

export = squel;