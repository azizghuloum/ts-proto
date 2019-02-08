import * as Long from 'long';
import {Writer, Reader} from 'protobufjs/minimal';
import {StringValue, Int32Value, BoolValue} from './google_protobuf_wrappers';


export enum StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
}

export interface Simple {
  name: string;
  age: number;
  child: Child;
  state: StateEnum;
  grandchildren: Array<Child>;
  coins: Array<number>;
  snacks: Array<string>;
  oldStates: Array<StateEnum>;
}

export interface Child {
  name: string;
}

export interface Nested {
  name: string;
  message: Nested_InnerMessage;
  state: Nested_InnerEnum;
}

export enum Nested_InnerEnum {
  UNKNOWN_INNER = 0,
  GOOD = 100,
  BAD = 1000,
}

export interface Nested_InnerMessage {
  name: string;
  deep: Nested_InnerMessage_DeepMessage;
}

export interface Nested_InnerMessage_DeepMessage {
  name: string;
}

export interface OneOfMessage {
  first: string | undefined;
  last: string | undefined;
}

export interface SimpleWithWrappers {
  name: string | undefined;
  age: number | undefined;
  enabled: boolean | undefined;
  coins: Array<number | undefined>;
  snacks: Array<string | undefined>;
}

const baseSimple: object = {
  name: "",
  age: 0,
  child: null,
  state: 0,
  grandchildren: null,
  coins: 0,
  snacks: "",
  oldStates: 0,
};

const baseChild: object = {
  name: "",
};

const baseNested: object = {
  name: "",
  message: null,
  state: 0,
};

const baseNested_InnerMessage: object = {
  name: "",
  deep: null,
};

const baseNested_InnerMessage_DeepMessage: object = {
  name: "",
};

const baseOneOfMessage: object = {
};

const baseSimpleWithWrappers: object = {
  name: null,
  age: null,
  enabled: null,
  coins: null,
  snacks: null,
};

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_VALUE)) {
    throw new Error("Value is larger than Number.MAX_VALUE");;
  }
  return long.toNumber();
}

export const Simple = {
  encode: function encodeSimple(message: Simple, writer: Writer = new Writer()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(16).int32(message.age);
    Child.encode(message.child, writer.uint32(26).fork()).ldelim();
    writer.uint32(32).int32(message.state);
    for (const v of message.grandchildren) {
      Child.encode(v, writer.uint32(42).fork()).ldelim();
    }
    writer.uint32(50).fork();
    for (const v of message.coins) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.snacks) {
      writer.uint32(58).string(v);
    }
    writer.uint32(66).fork();
    for (const v of message.oldStates) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  }
  ,
  decode: function decodeSimple(reader: Reader, length?: number): Simple {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSimple) as Simple;
    message.grandchildren = [];
    message.coins = [];
    message.snacks = [];
    message.oldStates = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.age = reader.int32();
          break;
        case 3:
          message.child = Child.decode(reader, reader.uint32());
          break;
        case 4:
          message.state = reader.int32();
          break;
        case 5:
          message.grandchildren.push(Child.decode(reader, reader.uint32()));
          break;
        case 6:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.coins.push(reader.int32());
            }
          } else {
            message.coins.push(reader.int32());
          }
          break;
        case 7:
          message.snacks.push(reader.string());
          break;
        case 8:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.oldStates.push(reader.int32());
            }
          } else {
            message.oldStates.push(reader.int32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }
  ,
};

export const Child = {
  encode: function encodeChild(message: Child, writer: Writer = new Writer()): Writer {
    writer.uint32(10).string(message.name);
    return writer;
  }
  ,
  decode: function decodeChild(reader: Reader, length?: number): Child {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseChild) as Child;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }
  ,
};

export const Nested = {
  encode: function encodeNested(message: Nested, writer: Writer = new Writer()): Writer {
    writer.uint32(10).string(message.name);
    Nested_InnerMessage.encode(message.message, writer.uint32(18).fork()).ldelim();
    writer.uint32(24).int32(message.state);
    return writer;
  }
  ,
  decode: function decodeNested(reader: Reader, length?: number): Nested {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseNested) as Nested;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.message = Nested_InnerMessage.decode(reader, reader.uint32());
          break;
        case 3:
          message.state = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }
  ,
};

export const Nested_InnerMessage = {
  encode: function encodeNested_InnerMessage(message: Nested_InnerMessage, writer: Writer = new Writer()): Writer {
    writer.uint32(10).string(message.name);
    Nested_InnerMessage_DeepMessage.encode(message.deep, writer.uint32(18).fork()).ldelim();
    return writer;
  }
  ,
  decode: function decodeNested_InnerMessage(reader: Reader, length?: number): Nested_InnerMessage {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseNested_InnerMessage) as Nested_InnerMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.deep = Nested_InnerMessage_DeepMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }
  ,
};

export const Nested_InnerMessage_DeepMessage = {
  encode: function encodeNested_InnerMessage_DeepMessage(message: Nested_InnerMessage_DeepMessage, writer: Writer = new Writer()): Writer {
    writer.uint32(10).string(message.name);
    return writer;
  }
  ,
  decode: function decodeNested_InnerMessage_DeepMessage(reader: Reader, length?: number): Nested_InnerMessage_DeepMessage {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseNested_InnerMessage_DeepMessage) as Nested_InnerMessage_DeepMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }
  ,
};

export const OneOfMessage = {
  encode: function encodeOneOfMessage(message: OneOfMessage, writer: Writer = new Writer()): Writer {
    if (message.first !== undefined && message.first != "") {
      writer.uint32(10).string(message.first!);
    }
    if (message.last !== undefined && message.last != "") {
      writer.uint32(18).string(message.last!);
    }
    return writer;
  }
  ,
  decode: function decodeOneOfMessage(reader: Reader, length?: number): OneOfMessage {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseOneOfMessage) as OneOfMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.first = reader.string();
          break;
        case 2:
          message.last = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }
  ,
};

export const SimpleWithWrappers = {
  encode: function encodeSimpleWithWrappers(message: SimpleWithWrappers, writer: Writer = new Writer()): Writer {
    StringValue.encode({ value: message.name! }, writer.uint32(10).fork()).ldelim();
    Int32Value.encode({ value: message.age! }, writer.uint32(18).fork()).ldelim();
    BoolValue.encode({ value: message.enabled! }, writer.uint32(26).fork()).ldelim();
    for (const v of message.coins) {
      Int32Value.encode({ value: v! }, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.snacks) {
      StringValue.encode({ value: v! }, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  }
  ,
  decode: function decodeSimpleWithWrappers(reader: Reader, length?: number): SimpleWithWrappers {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSimpleWithWrappers) as SimpleWithWrappers;
    message.coins = [];
    message.snacks = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.age = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.enabled = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.coins.push(Int32Value.decode(reader, reader.uint32()).value);
          break;
        case 7:
          message.snacks.push(StringValue.decode(reader, reader.uint32()).value);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }
  ,
};
