import { Command, Argument } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PrefixCommand extends Command {
	public constructor() {
		super('prefix', {
			category: 'Utilities',
			channel: 'guild',
			aliases: ['prefix'],
			args: [
				{
					id: 'prefix',
					type: Argument.validate('string', (_, p) => !/\s/.test(p) && p.length <= 10),
					prompt: {
						start: 'What do you want to set the prefix to?',
						retry: 'C\'mon. I need a prefix without spaces and less than 10 characters',
						optional: true
					}
				}
			],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'Changes this server\'s prefix.',
				usage: '[prefix]',
				examples: ['', '?', '>']
			}
		});
	}

	public async exec(msg: Message, { prefix }: { prefix: string }): Promise<Message | Message[]> {
		if (!prefix) {
			const prefix = this.client.settings!.guild.get(msg.guild.id)!.prefix;
			return msg.util!.reply(`the current prefix is \`${prefix}\`.`);
		}

		await this.client.settings!.set('guild', { id: msg.guild!.id }, { prefix });
		return msg.util!.reply(`successfully set the prefix to \`${prefix}\`.`);
	}
}
