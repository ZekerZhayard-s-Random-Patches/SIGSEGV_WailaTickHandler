var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");
var TypeInsnNode = Java.type("org.objectweb.asm.tree.TypeInsnNode");

function initializeCoreMod() {
    return {
        "WailaTickHandler_getNarrator": {
            "target": {
                "type": "METHOD",
                "class": "mcp/mobius/waila/overlay/WailaTickHandler",
                "methodName": "getNarrator",
                "methodDesc": "()Lcom/mojang/text2speech/Narrator;"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.INVOKESTATIC && node.owner.equals("com/mojang/text2speech/Narrator") && node.name.equals(ASMAPI.mapMethod("getNarrator")) && node.desc.equals("()Lcom/mojang/text2speech/Narrator;")) {
                        mn.instructions.insertBefore(node, new TypeInsnNode(Opcodes.NEW, "com/mojang/text2speech/NarratorDummy"));
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.DUP));
                        mn.instructions.set(node, new MethodInsnNode(Opcodes.INVOKESPECIAL, "com/mojang/text2speech/NarratorDummy", "<init>", "()V", false));
                    }
                }
                return mn;
            }
        }
    }
}
